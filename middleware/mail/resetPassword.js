const resetPassTemplate = (mail, token) =>
    `
        We heard that you lost your Pava password. Sorry about that!
        <br>
        <br>
        But don’t worry! You can use the following link to reset your password:
        <br>
        <br>
        <a href="http://localhost:3000/password_reset/${token}" target="_blank" > http://localhost:3000/password_reset ${token} </a>
        <br>
        <br>
        If you don’t use this link within 3 hours, it will expire. To get a new password reset link, visit <a href="http://localhost:3000/password_reset/" target="_blank">http://localhost:3000/password_reset/</a>
        <br>
        <br>
        Thanks,
        <br>
        Your friends at Pava 
        <br>
    `;


module.exports = resetPassTemplate;