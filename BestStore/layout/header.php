<?php
// Initialize session
session_start();

// Set authentication status based on session (this is an example, modify based on your actual logic)
$authenticated = false;
if (isset($_SESSION["email"])) {
    $authenticated = true;
}
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Best Store</title>
    <link rel="icon" href="/images/logo.png" type="image/png"> <!-- Corrected favicon reference -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <style>
        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            /* Keeps the navbar on top of other content */
        }

        body {
            padding-top: 70px;
            /* Adjust this value to match the height of your navbar */
        }
    </style>

</head>

<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="/index.php">
                <img src="/images/logo.png" width="40" height="40" class="d-inline-block align-top" alt="logo"> Best Store
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" href="/index.php">Home</a>
                    </li>
                </ul>

                <?php if ($authenticated): ?>
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Admin
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/profile.php">Profile</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="/logout.php">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                <?php else: ?>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a href="/register.php" class="btn btn-outline-primary me-2">Register</a>
                        </li>
                        <li class="nav-item">
                            <a href="/login.php" class="btn btn-primary">Login</a>
                        </li>
                    </ul>
                <?php endif; ?>
            </div>
        </div>
    </nav>