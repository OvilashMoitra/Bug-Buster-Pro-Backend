import config from "../../config";



export const resetPasswordTemplate = (token: string) => {
  return `<h2 style="color: #333;">Password Reset - BuildYourself</h2>
    <p>Hello there,</p>
    <p>You have requested to reset your password for your BuildYourself account. To reset your password, please click the link below:</p>
    
    <p style="text-align: center;">
        <a href="${config.server_url}/reset-password/${token}" style="display: inline-block; background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
    </p>
    
    <p>If you did not request this password reset, you can safely ignore this email.</p>
    
    <p>Thank you,<br> The BuildYourself Team</p>`;
};
