export const resetPasswordTemplate = (resetLink) => {
  return `
    <div style="font-family: Arial, sans-serif;">
      <h2>Password Reset</h2>

      <p>Click below button to reset your password.</p>

      <a 
        href="${resetLink}" 
        style="
          background:#2563eb;
          color:white;
          padding:10px 20px;
          text-decoration:none;
          border-radius:5px;
          display:inline-block;
        "
      >
        Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>
    </div>
  `;
};