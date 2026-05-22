<?php
include 'layout/header.php';
//logged in user are redirected to home page
if (isset($_SESSION["email"])) {
    header("Location: /index.php");
    exit();
}

// Initialize variables
$first_name = "";
$last_name = "";
$email = "";
$phone = "";
$address = "";

$first_name_error = "";
$last_name_error = "";
$email_error = "";
$phone_error = "";
$address_error = "";
$password_error = "";
$confirm_password_error = "";

$error = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and assign POST values to variables
    $first_name = htmlspecialchars(trim($_POST["first_name"]));
    $last_name = htmlspecialchars(trim($_POST["last_name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $phone = htmlspecialchars(trim($_POST["phone"]));
    $address = htmlspecialchars(trim($_POST["address"]));
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];

    // Validation checks
    if (empty($first_name)) {
        $first_name_error = "First name is required";
        $error = true;
    }

    if (empty($last_name)) {
        $last_name_error = "Last name is required";
        $error = true;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $email_error = "Email format is not valid";
        $error = true;
    }

    // Database check for existing email
    include 'tools/db.php';
    $dbConnection = getDatabaseConnection();
    $statement = $dbConnection->prepare("SELECT id FROM users WHERE email = ?");
    $statement->bind_param("s", $email);
    $statement->execute();
    $statement->store_result();
    
    if ($statement->num_rows > 0) {
        $email_error = "Email is already registered";
        $error = true;
    }
    $statement->close();

    if (!preg_match("/^(\+|00\d{1,2})?[-.]?\d{7,12}$/", $phone)) {
        $phone_error = "Phone format is not valid";
        $error = true;
    }

    if (strlen($password) < 6) {
        $password_error = "Password must be at least 6 characters long";
        $error = true;
    }

    if ($password !== $confirm_password) {
        $confirm_password_error = "Passwords and confirm password do not match";
        $error = true;
    }

    // If no errors, insert the new user into the database
    if (!$error) {
        // Hash password
        $password = password_hash($password, PASSWORD_DEFAULT);
        $created_at = date("Y-m-d H:i:s");

        // Insert the user into the database
        $statement = $dbConnection->prepare("INSERT INTO users (first_name, last_name, email, phone, address, password, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $statement->bind_param("sssssss", $first_name, $last_name, $email, $phone, $address, $password, $created_at);
        $statement->execute();
        
        // Get the inserted ID
        $inserted_id = $statement->insert_id;
        $statement->close();

        // Start session and save user info
        $_SESSION["id"] = $inserted_id;
        $_SESSION["first_name"] = $first_name;
        $_SESSION["last_name"] = $last_name;
        $_SESSION["email"] = $email;
        $_SESSION["phone"] = $phone;
        $_SESSION["address"] = $address;
        $_SESSION["created_at"] = $created_at;

        // Redirect to profile page after successful registration
        header("Location: /index.php");
        exit();
    }
}
?>

<div class="container py-5">
    <div class="row">
        <div class="col-lg-6 mx-auto border shadow p-4">
            <h2 class="text-center mb-4">Register</h2>
            <hr>
            <form method="post">

                <!-- First Name -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">First Name*</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" name="first_name" value="<?= $first_name ?>">
                        <span class="text-danger"><?= $first_name_error ?> </span>
                    </div>
                </div>

                <!-- Last Name -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">Last Name*</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" name="last_name" value="<?= $last_name ?>">
                        <span class="text-danger"><?= $last_name_error ?> </span>
                    </div>
                </div>

                <!-- Email -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">Email*</label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" name="email" value="<?= $email ?>">
                        <span class="text-danger"><?= $email_error ?> </span>
                    </div>
                </div>

                <!-- Phone -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">Phone*</label>
                    <div class="col-sm-8">
                        <input type="tel" class="form-control" name="phone" value="<?= $phone ?>">
                        <span class="text-danger"><?= $phone_error ?> </span>
                    </div>
                </div>

                <!-- Address -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">Address</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" name="address" value="<?= $address ?>">
                        <span class="text-danger"><?= $address_error ?></span>
                    </div>
                </div>

                <!-- Password -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">Password*</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" name="password">
                        <span class="text-danger"><?= $password_error ?> </span>
                    </div>
                </div>

                <!-- Confirm Password -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">Confirm Password*</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" name="confirm_password">
                        <span class="text-danger"><?= $confirm_password_error ?></span>
                    </div>
                </div>

                <!-- Submit and Cancel Buttons -->
                <div class="row mb-3">
                    <div class="offset-sm-4 col-sm-4 d-grid">
                        <button class="btn btn-primary" type="submit">Register</button>
                    </div>
                    <div class="col-sm-4 d-grid">
                        <a href="/index.php" class="btn btn-outline-primary">Cancel</a>
                    </div>
                </div>

            </form>
        </div>
    </div>
</div>

<?php
include 'layout/footer.php';
?>
