<?php
include 'layout/header.php';
if (!isset($_SESSION["email"])) {
    header("Location: /login.php");
    exit();
}

$id = $_SESSION['id'];
include 'tools/db.php';
$dbConnection = getDatabaseConnection();

// Fetch user details
$query = "SELECT first_name, last_name, email, phone, address FROM users WHERE id = ?";
$stmt = $dbConnection->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->bind_result($first_name, $last_name, $email, $phone, $address);
$stmt->fetch();
$stmt->close();

// Handle Update
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['update'])) {
    // Handle form submission for updating user data
    $first_name = htmlspecialchars(trim($_POST["first_name"]));
    $last_name = htmlspecialchars(trim($_POST["last_name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $phone = htmlspecialchars(trim($_POST["phone"]));
    $address = htmlspecialchars(trim($_POST["address"]));

    $update_query = "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ? WHERE id = ?";
    $update_stmt = $dbConnection->prepare($update_query);
    $update_stmt->bind_param("sssssi", $first_name, $last_name, $email, $phone, $address, $id);
    $update_stmt->execute();
    $update_stmt->close();

    // Update session variables if needed
    $_SESSION["first_name"] = $first_name;
    $_SESSION["last_name"] = $last_name;
    $_SESSION["email"] = $email;
    $_SESSION["phone"] = $phone;
    $_SESSION["address"] = $address;

    // Redirect to the profile page
    header("Location: /profile.php");
    exit();
}

// Handle Delete
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['delete'])) {
    // Handle user account deletion
    $delete_query = "DELETE FROM users WHERE id = ?";
    $delete_stmt = $dbConnection->prepare($delete_query);
    $delete_stmt->bind_param("i", $id);
    $delete_stmt->execute();
    $delete_stmt->close();

    // Destroy session and redirect to the homepage
    session_unset();
    session_destroy();
    header("Location: /index.php");
    exit();
}
?>

<div class="container py-5">
    <div class="row">
        <div class="col-lg-6 mx-auto border shadow p-4">
            <h2 class="text-center mb-4">Your Profile</h2>
            <hr>
            <form method="post">
                <!-- First Name -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">First Name</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" name="first_name" value="<?= $first_name ?>">
                    </div>
                </div>

                <!-- Last Name -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">Last Name</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" name="last_name" value="<?= $last_name ?>">
                    </div>
                </div>

                <!-- Email -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">Email</label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" name="email" value="<?= $email ?>">
                    </div>
                </div>

                <!-- Phone -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">Phone</label>
                    <div class="col-sm-8">
                        <input type="tel" class="form-control" name="phone" value="<?= $phone ?>">
                    </div>
                </div>

                <!-- Address -->
                <div class="row mb-3">
                    <label class="col-sm-4 col-form-label">Address</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" name="address" value="<?= $address ?>">
                    </div>
                </div>

                <!-- Update Button -->
                <div class="row mb-3">
                    <div class="offset-sm-4 col-sm-4 d-grid">
                        <button class="btn btn-primary" type="submit" name="update">Update</button>
                    </div>
                </div>

                <!-- Cancel Button -->
                <div class="row mb-3">
                    <div class="offset-sm-4 col-sm-4 d-grid">
                        <a href="/profile.php" class="btn btn-outline-secondary">Cancel</a>
                    </div>
                </div>
            </form>

            <!-- Delete Account Button -->
            <form method="post">
                <div class="row mb-3">
                    <div class="col-sm-12 d-grid">
                        <button class="btn btn-danger" type="submit" name="delete">Delete Account</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
</div>

<?php
include 'layout/footer.php';
?>
