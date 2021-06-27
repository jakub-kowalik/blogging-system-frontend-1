import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";

const Socials = ({shareUrl}) => {
    return (
        <>
            <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={48}/>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={48}/>
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={48}/>
            </LinkedinShareButton>
        </>
    )
}
export default Socials