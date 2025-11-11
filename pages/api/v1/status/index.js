function status(request, response) {
  response.status(200).json({ status: "Estão funcionando!" });
}

export default status;
