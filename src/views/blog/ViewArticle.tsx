import React, { useEffect, useState } from "react";
import InterCom from "@src/views/common/InterCom";
import { toast } from "react-toastify";
import { getArticle } from "@src/state/stores/opportunity/operations";
import { Article } from "@src/state/stores/opportunity/models";
import { useParams } from "react-router";
import { SpinnerDotted } from "spinners-react";
// @ts-ignore
import person from "@src/assets/blog/PersonBlogThumbnail.png";
import { getDateFromString } from "@src/utilities/ui";

import "./blog.css";

const ViewArticle: React.FunctionComponent = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<Article>();

  const htmlString: string =
    "<p>safjsdjkljfasjj</p><p><strong>fdsafsafasdf</strong></p><p><strong><u>sadfasdfasd</u></strong></p><ul><li><strong><u>asfsadfasdfa</u></strong></li><li><strong><u>asdfsadf</u></strong></li><li><strong><u>asdfasdf</u></strong></li></ul><h1>hahaha</h1><blockquote>asdasdasdas</blockquote>";

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getArticle(id).then((response) => {
        //@ts-ignore
        console.log(response);
        setArticle(response);
        setIsLoading(false);
      });
    }
  }, [id]);

  return (
    <>
      <section className={"articleContainer"}>
        {isLoading ? (
          <SpinnerDotted size="150" color="#8970FA" />
        ) : (
          <>
            <div className="has-text-centered mb-5">
              {/* {isLoading && "Loading..."} */}
              <h6 className="is-small has-text-weight-bold has-text-primary">
                Published on {getDateFromString(article?.createdAt)}
              </h6>
              <h1 className="title has-text-weight-bold has-text-black">
                {article?.title}
              </h1>
            </div>
            <img className="articleImage" src={article?.blogPhoto?.imageUrl} />
            <div className="contentContainer">
              <div
                className="contentContainer-textStyle"
                dangerouslySetInnerHTML={{ __html: article?.content || "" }}
              />
              <hr />
              <div className="authorAndSocialContainer">
                <div className="authorAndImageSection">
                  <img src={person} />
                  <div className="authorName">
                    <p className={"is-size-10 has-text-weight-semibold"}>
                      Rafail Roumeliotis
                    </p>
                    <p className={"is-size-10 has-text-weight-light"}>CEO</p>
                  </div>
                </div>
                <button
                  className="button copyLinkButton"
                  onClick={() => {
                    let url = document.location.href;
                    navigator.clipboard.writeText(url);
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ViewArticle;
