import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./rating.scss";

const RatingStar = ({
  className = "",
  label = "",
  input,
  meta = {},
  ratingStar,
}) => {
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">{label}</Typography>
        <Rating name="pristine" value={ratingStar} precision={0.5} />
      </Box>
    </div>
  );
};
export default RatingStar;
