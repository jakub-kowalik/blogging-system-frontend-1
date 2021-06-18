import BlogObject from "./BlogObject";
import Comment from "./Comment";
import {isUser} from "../../utility/Authorization";
import Socials from "./Socials";

const BlogEntry = ({entryData, isFrontpage}) => {

    const shareUrl = "http://example.com"

    const sampleData = {
        author: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            username: "Author-name"
        },
        blogObjects: [
            {
                content: "https://www.w3schools.com/tags/img_girl.jpg",
                positionInBlogEntry: 1,
                type: "photo"
            },
            {
                content: "https://www.w3schools.com/tags/img_girl.jpg",
                positionInBlogEntry: 2,
                type: "text"
            },
            {
                content: "\n" +
                    "\n" +
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in ipsum quis metus dictum tristique. Curabitur eu laoreet diam. Fusce tincidunt porttitor lorem, ut tincidunt sapien venenatis viverra. Cras pellentesque massa in nunc efficitur porttitor. Donec vitae eros finibus, consectetur mauris eget, sodales leo. Morbi eleifend iaculis orci, eget convallis ante semper eu. Ut erat libero, faucibus vel hendrerit non, euismod semper dui. Donec eget malesuada ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In at auctor ligula. Proin semper rutrum neque, at pharetra tortor porta vitae. Praesent dapibus orci iaculis, viverra felis sed, porttitor lectus.\n" +
                    "\n" +
                    "Sed nec sapien iaculis, molestie nulla eget, convallis felis. Duis posuere ante blandit, porttitor felis ultricies, imperdiet orci. Donec bibendum vel dui imperdiet facilisis. Integer nec orci quam. Mauris nisl lectus, ultricies vel velit non, blandit vehicula risus. Ut sit amet erat luctus ipsum malesuada malesuada. Cras consequat, metus nec consectetur egestas, mauris sapien tempor metus, sit amet porta eros dolor eget risus.\n" +
                    "\n" +
                    "Suspendisse euismod dolor sit amet libero rutrum ultricies. Nullam at erat arcu. Morbi tristique lectus ut viverra condimentum. Sed sit amet imperdiet ipsum. Fusce mattis mauris vitae dolor tempor accumsan. Aenean eleifend laoreet mi, nec tincidunt eros euismod non. Duis convallis odio a ultricies feugiat.\n" +
                    "\n" +
                    "Fusce eu diam tortor. Praesent id felis vel risus maximus ornare quis quis augue. Fusce sed vestibulum tellus. Nam at finibus est. Maecenas sed lobortis quam, sit amet semper ex. Pellentesque ultricies dui ac tellus aliquet pulvinar. Morbi non mi vitae nisl rutrum volutpat in ac lorem. Vestibulum bibendum ante risus, quis varius augue convallis in. Nullam ultrices pellentesque ipsum nec pellentesque. Ut condimentum, odio eu ullamcorper fringilla, leo risus fringilla lorem, quis accumsan tortor magna ac neque. Maecenas condimentum nulla eu diam sodales ullamcorper. Nulla facilisi.\n" +
                    "\n" +
                    "Fusce in pulvinar nunc, a ornare sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin neque justo, consequat eget ipsum vitae, ultrices scelerisque orci. Mauris placerat ipsum eget tortor cursus, tristique euismod urna condimentum. Nam interdum pellentesque mattis. Donec aliquam bibendum nulla sed aliquam. Sed quis vehicula sem, non tristique nunc. Aliquam in mi ac turpis consectetur mollis vel eu massa. Phasellus quis molestie augue. Donec et commodo justo. Integer quis enim sapien. Mauris quam lacus, viverra id euismod eu, mattis non lacus. ",
                positionInBlogEntry: 0,
                type: "text"
            },
            {
                content: "https://images.unsplash.com/photo-1543314444-26a64fa5efe1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVyeSUyMGxhcmdlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
                positionInBlogEntry: 3,
                type: "photo"
            },
            {
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in ipsum quis metus dictum tristique. Curabitur eu laoreet diam. Fusce tincidunt porttitor lorem, ut tincidunt sapien venenatis viverra. Cras pellentesque massa in nunc efficitur porttitor. Donec vitae eros finibus, consectetur mauris eget, sodales leo. Morbi eleifend iaculis orci, eget convallis ante semper eu. Ut erat libero, faucibus vel hendrerit non, euismod semper dui. Donec eget malesuada ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In at auctor ligula. Proin semper rutrum neque, at pharetra tortor porta vitae. Praesent dapibus orci iaculis, viverra felis sed, porttitor lectus.",
                positionInBlogEntry: 4,
                type: "text"
            },
            {
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in ipsum quis metus dictum tristique. Curabitur eu laoreet diam. Fusce tincidunt porttitor lorem, ut tincidunt sapien venenatis viverra. Cras pellentesque massa in nunc efficitur porttitor. Donec vitae eros finibus, consectetur mauris eget, sodales leo. Morbi eleifend iaculis orci, eget convallis ante semper eu. Ut erat libero, faucibus vel hendrerit non, euismod semper dui. Donec eget malesuada ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In at auctor ligula. Proin semper rutrum neque, at pharetra tortor porta vitae. Praesent dapibus orci iaculis, viverra felis sed, porttitor lectus.",
                positionInBlogEntry: 5,
                type: "text"
            }
        ],
        createdDate: "2021-06-18T13:42:09.768Z",
        modifiedDate: "2021-06-18T13:42:09.768Z",
        title: "string",
        viewCount: 0
    }

    const sampleComment = [
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in ipsum quis metus dictum tristique. Curabitur eu laoreet diam. Fusce tincidunt porttitor lorem, ut tincidunt sapien venenatis viverra. Cras pellentesque massa in nunc efficitur porttitor. Donec vitae eros finibus, consectetur mauris eget, sodales leo.",
            createdDate: "2021-06-18T16:01:08.004Z",
            id: "string",
            username: "string"
        },
        {
            content: "string2",
            createdDate: "2021-06-18T16:01:08.004Z",
            id: "string2",
            username: "string2"
        }

    ]

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function formatDate(dateString) {
        let date = new Date(dateString);
        return (date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear())
    }

    return (
        <>
            <article className={"text-start px-5 pt-3 pb-3 m-3 bg-info rounded-3"}>
                <header className="mb-4">

                    <h1 className="fw-bolder mb-1">Welcome to Blog Post!</h1>

                    <div className="text-muted fst-italic mb-2">Posted on <span
                        title={sampleData.createdDate}>{formatDate(sampleData.createdDate)}</span> by {sampleData.author.username}
                    </div>
                </header>
                <hr/>
                <section>
                    {sampleData.blogObjects
                        .sort((a, b) => a.positionInBlogEntry > b.positionInBlogEntry ? 1 : -1)
                        .map(blogObject => (
                            <BlogObject key={blogObject.positionInBlogEntry} blogObject={blogObject}/>))}
                </section>
                <hr/>
                <div className={"container w-100"}>
                    <div className={"row"}>
                        <div className={"col my-auto"}>
                            {isUser() &&
                                <button className={"btn btn-dark"}>Comment</button>
                            }
                        </div>
                        <div className={"col my-auto"}>
                            <span className={"float-end"}>
                                <Socials shareUrl={shareUrl} />
                            </span>
                        </div>
                    </div>
                </div>
                <hr/>
            </article>
            {!isFrontpage &&
            sampleComment.map(comment => (<Comment key={comment.id} comment={comment}/>))
            }
        </>
    );
}

export default BlogEntry