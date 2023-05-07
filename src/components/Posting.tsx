import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function Posting({ tweet, componentRef }: any) {
  return (
    <Grid container ref={componentRef} sx={{ background: "black" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h5" sx={{ maxWidth: 480 }}>
          {tweet?.message?.tweet}
        </Typography>
        {!tweet && <Typography>Generate a post.</Typography>}
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        {tweet && (
          <Image
            alt="image"
            width={512}
            height={512}
            src={`data:image/png;base64,${tweet?.files[0].content}`}
            style={{ objectFit: "contain" }}
          />
        )}
      </Grid>
    </Grid>
  );
}
