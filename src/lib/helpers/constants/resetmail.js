const resetpage=(link)=>{
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Poster Background</title>
    <style>
        /* Global styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f7df6f; /* Yellow color */
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        /* Container styles */
        .container {
            display: flex;
            align-items: center;
            justify-content:center;
            background-color: #FFD700; 
            padding: 20px;
            border-radius: 10px;
            flex-direction: column;
        }

        /* Logo styles */
        .logo {
            width: 100px; /* Adjust size as needed */
            height: 100px;
        }

        /* Text styles */
        .text {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-top:23px;
            margin-left:5px;
        }

        /* Button styles */
        .button {
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 5px;
        }
    </style>
</head>
<body>
<div>
    <div class="container">
        <img src="https://pgot.net/_next/image?url=%2Fstatics%2Fimages%2Flogo.png&w=128&q=75" alt="Logo" class="logo">
        <div class="text">Prime Genesis of Technology</div>
    </div>
    
        <p style="text-align: center; color: #666;">Please proceed by clicking the button below to start the password reset process. Your security is our priority, and we'll guide you through the steps to ensure your account remains protected.</p>
        <div style="text-align: center;">
            <a href="${link}" class="button">Reset Password</a>
        </div>
</div>    
</body>
</html>

    `
}


//////////////

////////////////// Exporting Constants /////

export default resetpage