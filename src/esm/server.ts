function serverCheck(app) {
  app.post("/check", async (req, res) => {
    res.status(200).json({ msg: "Server is running" });
  });
}

export default serverCheck;
