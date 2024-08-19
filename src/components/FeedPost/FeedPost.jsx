import { Box, Image } from "@chakra-ui/react"
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import PostHeader from './PostHeader'
import { PostFooter } from "./PostFooter";

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <> 
			<PostHeader post={post} creatorProfile={userProfile} />
			<Box my={2} borderRadius={4} overflow={""} >
				<Image src={post.imageURL} alt={"FEED POST IMG"} w={'36vw'} h={'auto'} />
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</>
  )
}

export default FeedPost;