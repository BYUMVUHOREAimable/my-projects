<?php
include 'layout/header.php';

// Check if user is already logged in, if yes, redirect to home page
if (isset($_SESSION["email"])) {
    header("Location: /index.php");
    exit();
}

$email = "";
$password = "";
$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and assign POST values to variables
    $email = htmlspecialchars(trim($_POST["email"]));
    $password = $_POST["password"];

    // Check if fields are empty
    if (empty($email) || empty($password)) {
        $error = "Email and password are required.";
    } else {
        // Database connection
        include 'tools/db.php';
        $dbConnection = getDatabaseConnection();
        
        // Prepare SQL query to fetch user details based on email
        $statement = $dbConnection->prepare("SELECT id, first_name, last_name, email, phone, address, password, created_at FROM users WHERE email = ?");
        $statement->bind_param("s", $email);
        $statement->execute();

        $statement->bind_result($id, $first_name, $last_name, $email, $phone, $address, $stored_password, $created_at); 

        if ($statement->fetch()) {
            // User found, now verify password
            if (password_verify($password, $stored_password)) {
                // Password is correct, start a new session and store user data
                session_regenerate_id(); // Prevent session fixation
                $_SESSION["id"] = $id;
                $_SESSION["first_name"] = $first_name;
                $_SESSION["last_name"] = $last_name;
                $_SESSION["email"] = $email;
                $_SESSION["phone"] = $phone;
                $_SESSION["address"] = $address;
                $_SESSION["created_at"] = $created_at;

                // Redirect to home page after successful login
                header("Location: /index.php");
                exit();
            } else {
                // Password is incorrect
                $error = "Invalid email or password.";
            }
        } else {
            // No user found with that email
            $error = "Invalid email or password.";
        }
        $statement->close();
    }
}
?>

<div class="container py-5">
    <div class="mx-auto border shadow p-4" style="width: 400px">
        <h2 class="text-center mb-4">Log in</h2>
        <hr>

        <?php if (!empty($error)) { ?>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong><?= $error; ?></strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php } ?>

        <form method="post">
            <!-- Email -->
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" name="email" value="<?= $email ?>" required>
            </div>

            <!-- Password -->
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" name="password" value="<?= $password ?>" required>
            </div>

            <!-- Login Button -->
            <div class="d-grid">
                <button type="submit" class="btn btn-primary">Login</button>
            </div>

            <!-- Cancel Button -->
            <div class="col d-grid ">
                <a href="/index.php" class="btn btn-outline-primary">Cancel</a>
            </div>
        </form>
    </div>
</div>

<?php
include 'layout/footer.php';
?>
