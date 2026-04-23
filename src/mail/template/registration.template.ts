const registrationTemplate = (name: string): string => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td style="background:#0f0f0f;padding:24px 40px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:24px;">🎉 Registration Successful!</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="color:#333;font-size:16px;">Hey <strong>${name}</strong>,</p>
            <p style="color:#555;font-size:15px;line-height:1.6;">
              Welcome to our platform! Your account has been created successfully. 🚀
            </p>

            <!-- Feature list -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333;">✅ &nbsp; Complete your profile</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333;">📚 &nbsp; Explore available courses</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#333;">🤝 &nbsp; Connect with the community</td></tr>
              <tr><td style="padding:10px 0;font-size:14px;color:#333;">🏆 &nbsp; Start your learning journey</td></tr>
            </table>

            <!-- CTA Button -->
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:32px auto 20px;">
            <tr>
                <td align="center" bgcolor="#e63946" style="border-radius:6px;">
                <a href="http://localhost:5173/login"
                    target="_blank"
                    style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;">
                    Go to Login
                </a>
                </td>
            </tr>
            </table>

            <p style="color:#aaa;font-size:12px;text-align:center;">
              If you didn't create this account, please ignore this email.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:16px 40px;text-align:center;border-top:1px solid #eee;">
            <p style="color:#aaa;font-size:12px;margin:0;">© 2024 YourApp. All rights reserved.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;

export default registrationTemplate;
