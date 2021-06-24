const BlogObject = ({blogObject}) => {

    function isText() {
        return blogObject.type.includes('paragraph');
    }

    function isPhoto() {
        return blogObject.type.includes('photo');
    }

    return (
        <>
            {isText() &&
            <p style={{textIndent: "4em", whiteSpace: "pre-wrap"}}>
                {blogObject.content}
            </p>
            }
            {isPhoto() &&
            <p className={"text-center"}>
                <img className={"w-100 rounded-3"} src={blogObject.content} alt={"pictograph"} />
            </p>
            }
        </>
    );

};

export default BlogObject