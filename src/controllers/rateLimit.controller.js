export const getData = (req, res) => {
  res.json({
    message: "Data Fetched Successfully!",
    user: req.headers.userid,
    ip: req.ip,
  });
};
