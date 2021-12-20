import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PinterestIcon from "@material-ui/icons/Pinterest";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TelegramIcon from "@material-ui/icons/Telegram";
import { IconButton } from "@material-ui/core";

const SocialMediaIcon = ({ s: { socialMedia, link } }) => {
  switch (socialMedia) {
    case "facebook":
      return (
        <a href={link}>
          <IconButton>
            <FacebookIcon fontSize="large" />
          </IconButton>
        </a>
      );
    case "instagram":
      return (
        <a href={link}>
          <IconButton>
            <InstagramIcon fontSize="large" />
          </IconButton>
        </a>
      );
    case "twitter":
      return (
        <a href={link}>
          <IconButton>
            <TwitterIcon fontSize="large" />
          </IconButton>
        </a>
      );
    case "linkedin":
      return (
        <a href={link}>
          <IconButton>
            <LinkedInIcon fontSize="large" />
          </IconButton>
        </a>
      );
    case "pinterest":
      return (
        <a href={link}>
          <IconButton>
            <PinterestIcon fontSize="large" />
          </IconButton>
        </a>
      );
    case "youtube":
      return (
        <a href={link}>
          <IconButton>
            <YouTubeIcon fontSize="large" />
          </IconButton>
        </a>
      );
    case "Telegram":
      return (
        <a href={link}>
          <IconButton>
            <TelegramIcon fontSize="large" />
          </IconButton>
        </a>
      );
    default:
      return "";
  }
};
export default SocialMediaIcon;
