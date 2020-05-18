const JwtDecoder = jwt => {
  const secondSegment = jwt.split(".")[1];
  return JSON.parse(atob(secondSegment));
};

export default JwtDecoder;
