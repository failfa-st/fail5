import Posting from "@/components/Posting";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";
// @ts-ignore
import { saveAs } from "file-saver";
import Options from "@/components/Options";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState(null);

  async function fetcher() {
    try {
      setLoading(true);
      const response = await axios.get("/api/x-better-y");
      setTweet(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const componentRef = useRef();
  const handleDownloadScreenshot = async () => {
    // @ts-ignore
    const canvas = await html2canvas(componentRef.current);
    canvas.toBlob((blob) => {
      // @ts-ignore
      saveAs(blob, tweet?.message?.fileName);
    });
  };

  const handleDownloadImage = async () => {
    const img = new window.Image();
    // @ts-ignore
    img.src = `data:image/png;base64,${tweet?.files[0].content}`;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      // @ts-ignore
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        // @ts-ignore
        saveAs(blob, `${tweet?.message?.fileName}_image.png`);
      });
    };
  };

  function copyTweetToClipboard() {
    // @ts-ignore
    const tweetText = tweet?.message?.tweet;
    if (tweetText) {
      navigator.clipboard.writeText(tweetText).then(
        () => {
          console.log("Copied to clipboard:", tweetText);
        },
        (error) => {
          console.error("Clipboard write failed:", error);
        }
      );
    } else {
      console.warn("Tweet text is not available.");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "black",
        minHeight: "100vh",
      }}
    >
      <Posting tweet={tweet} componentRef={componentRef} />
      <Options
        fetcher={fetcher}
        loading={loading}
        handleDownloadImage={handleDownloadImage}
        handleDownloadScreenshot={handleDownloadScreenshot}
        copyTweetToClipboard={copyTweetToClipboard}
      />
      <Box>
        <Button startIcon={<TwitterIcon />} variant="outlined" size="small">
          x better y
        </Button>
      </Box>
    </Box>
  );
}
