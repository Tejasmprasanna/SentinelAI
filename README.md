# SentinelAI

## File Upload Testing

- Do **not** use PowerShell to test multipart file uploads.
- Use Git Bash or any Unix-like terminal instead.
- Ensure `test_logs.txt` is in the same folder where you run the command.

Run:

```bash
curl -X POST https://sentinelai-zuqj.onrender.com/analyze -F "file=@test_logs.txt"
```
