import React, { useEffect, useState } from "react";
import "./Blog.css";

const urlimg = "https://blog.uniquiz.com.mx/wp-json/wp/v2/media/";
const lastPosts =
  "https://blog.uniquiz.com.mx/wp-json/wp/v2/posts/?_orderby&_embed=true";
const popularPosts =
  "https://blog.uniquiz.com.mx/wp-json/wordpress-popular-posts/v1/popular-posts/?_embed=true";

function App() {
  const [blog, setBlog] = useState(null);
  const [popularBlog, setPopularBlog] = useState(null);
  const [urlImg1, setUrlImg1] = useState();
  const [urlImg2, setUrlImg2] = useState();
  const [urlImg3, setUrlImg3] = useState();
  useEffect(() => {
    fetch(lastPosts)
      .then((res) => res.json())
      .then((data) => {
        const blogData = data;
        setBlog(blogData);
      });

    fetch(popularPosts)
      .then((res) => res.json())
      .then((data) => {
        const popularBlogData = data;
        setPopularBlog(popularBlogData[0]);
      });
  }, []);

  useEffect(() => {
    if (blog) {
      fetch(urlimg + blog[blog.length - 2].featured_media)
        .then((res) => res.json())
        .then((data) => {
          setUrlImg1(data.source_url);
        });
      fetch(urlimg + blog[blog.length - 1].featured_media)
        .then((res) => res.json())
        .then((data) => {
          setUrlImg2(data.source_url);
        });
    }
  }, [blog]);

  useEffect(() => {
    if (popularBlog) {
      fetch(urlimg + popularBlog.featured_media)
        .then((res) => res.json())
        .then((data) => {
          setUrlImg3(data.source_url);
        });
    }
  }, [popularBlog]);
  // Parrafo blog1
  function paragraph(id) {
    return { __html: blog[blog.length - id].excerpt.rendered };
  }

  function paragraphPopular() {
    return { __html: popularBlog.excerpt.rendered };
  }

  return (
    <div className="App">
      {!blog ? (
        "Cargando..."
      ) : (
        <div className="sec4container">
          <div className="cardbg">
            <h3 className="h3s4">{blog[blog.length - 2].title.rendered}</h3>

            <img className="img-blog" src={urlImg1} alt="img-blog"></img>

            <p dangerouslySetInnerHTML={paragraph(2)} />

            <a href={blog[blog.length - 2].link}> ver más</a>
          </div>
          <div className="cardbg">
            <h3>{blog[blog.length - 1].title.rendered}</h3>

            <img className="img-blog" src={urlImg2} alt="img-blog"></img>

            <p dangerouslySetInnerHTML={paragraph(1)} />

            <a href={blog[blog.length - 1].link}> ver más</a>
          </div>
          <div className="cardbg">
              <h3>{popularBlog.title.rendered}</h3>

            <img className="img-blog" src={urlImg3} alt="img-blog"></img>

            <p dangerouslySetInnerHTML={paragraphPopular()} />

            <a href={popularBlog.link}> ver más</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
