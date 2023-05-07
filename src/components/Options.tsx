import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import ImageIcon from "@mui/icons-material/Image";
import JoinFullIcon from "@mui/icons-material/JoinFull";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function Options({
  fetcher,
  loading,
  handleDownloadImage,
  handleDownloadScreenshot,
  copyTweetToClipboard,
}: any) {
  return (
    <Box my={2}>
      <Button
        variant="contained"
        disabled={loading}
        startIcon={loading && <CircularProgress size={10} />}
        onClick={() => {
          fetcher();
        }}
      >
        generate post
      </Button>{" "}
      <Button
        variant="outlined"
        startIcon={<FormatColorTextIcon />}
        endIcon={<ContentCopyIcon />}
        onClick={copyTweetToClipboard}
      >
        copy text
      </Button>
      <Button
        variant="outlined"
        startIcon={<ImageIcon />}
        endIcon={<DownloadIcon />}
        onClick={handleDownloadImage}
      >
        download image
      </Button>
      <Button
        variant="outlined"
        startIcon={<JoinFullIcon />}
        endIcon={<DownloadIcon />}
        onClick={handleDownloadScreenshot}
      >
        image + text screenshot
      </Button>
    </Box>
  );
}
