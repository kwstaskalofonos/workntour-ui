import React, { useEffect, useState } from "react";
import InterCom from "@src/views/common/InterCom";
import { toast } from "react-toastify";
import { getArticle } from "@src/state/stores/opportunity/operations";
import { Article } from "@src/state/stores/opportunity/models";
import { useParams } from "react-router";
import blog2 from "@src/assets/blog/blog2.png";
import person from "@src/assets/blog/PersonBlogThumbnail.png";
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
        setArticle(response);
        setIsLoading(false);
      });
    }
  }, [id]);

  return (
    <React.Fragment>
      <section className={"section"} style={{ backgroundColor: "#FAF9FF" }}>
        <div className="articleContainer">
          <div className="has-text-centered mb-5">
            {/* {isLoading && "Loading..."} */}
            <h6 className="is-small has-text-weight-bold has-text-primary">
              Published on 20 Jan 2022
            </h6>
            <h1 className="title has-text-weight-bold has-text-black">
              {/* {article?.title} */}
              An Awesome Experience
            </h1>
          </div>
          <img className="articleImage" src={blog2} />
          <div className="textContainer">
            <p>
              {/* <div dangerouslySetInnerHTML={{ __html: htmlString }} /> */}
              Nulla in culpa sit nostrud ad ex magna enim culpa esse esse Lorem
              sunt. Aute aliquip enim deserunt cillum pariatur sit magna velit.
              Voluptate elit aliquip pariatur sunt sint aute tempor voluptate
              mollit nisi veniam labore id. Eu reprehenderit excepteur ullamco
              Lorem qui labore in. Excepteur occaecat proident occaecat
              cupidatat culpa id esse quis. Laborum nisi tempor sunt sit. Aliqua
              cillum ullamco dolor minim sunt aliquip deserunt dolore dolor et
              culpa quis dolor reprehenderit. Fugiat tempor Lorem aliqua minim
              exercitation aliquip quis. Occaecat sunt esse mollit ad consequat.
              Incididunt duis duis nulla aliquip dolor officia nisi deserunt sit
              labore aliquip cillum culpa. Aute est laboris deserunt anim
              consectetur velit tempor irure sit. Excepteur ullamco nulla ex non
              veniam velit irure veniam voluptate. Ex sunt qui eu laboris sunt
              eu amet. Aute minim nisi in nisi aliqua velit qui ex laboris.
              Velit laborum aliqua aliquip velit culpa est. Ex et laborum dolore
              eu consequat ut ipsum consectetur Lorem laborum amet ullamco sint
              cillum. Exercitation eu aute tempor aute fugiat dolore ad
              adipisicing incididunt aute minim. Minim ad occaecat anim amet
              cillum in id cillum aliqua amet. Occaecat nisi enim do officia
              cillum. Aliqua cillum in laboris ex ut esse Lorem eiusmod ullamco
              tempor. Veniam labore exercitation magna sint sunt minim
              adipisicing quis. Et mollit ullamco ipsum voluptate mollit. Cillum
              ad proident velit minim deserunt velit nisi culpa consectetur sunt
              id. In incididunt laboris minim adipisicing excepteur ut do duis
              labore consectetur cupidatat consectetur fugiat. Ex sint consequat
              ea nisi irure dolore. Ad ex officia occaecat nostrud id ipsum non
              et voluptate minim reprehenderit qui. Nostrud ut nisi duis
              incididunt occaecat laboris Lorem adipisicing. Lorem qui tempor
              mollit sunt aute consequat Lorem consectetur elit occaecat ipsum
              mollit. Eu anim non consequat reprehenderit veniam. Sunt enim
              velit esse nostrud elit minim eu amet eu mollit enim veniam
              consectetur. Enim ipsum eiusmod do dolor. Aliqua aute id ipsum
              occaecat magna amet elit nostrud consequat tempor eiusmod Lorem
              veniam tempor. Mollit Lorem labore non ullamco ex eu esse ullamco
              do duis minim. Magna eu et fugiat et nulla occaecat consequat
              consectetur laborum aliqua ex cillum non ex. Irure adipisicing
              laborum nulla cupidatat magna ut proident ea enim. Dolore quis
              reprehenderit adipisicing nisi est adipisicing ipsum commodo
              laboris adipisicing ut officia. Deserunt labore eiusmod pariatur
              ea consequat. Culpa est ipsum in sit cillum aute cillum
              reprehenderit culpa aute. Minim non aliqua qui ullamco do. Anim
              occaecat tempor ea non excepteur ex quis esse labore ipsum
              proident esse sunt culpa. Mollit magna fugiat deserunt amet
              officia anim culpa commodo. Nostrud dolore pariatur elit ex esse.
              Aliqua minim labore proident amet anim nisi in in ullamco. Elit
              deserunt ex sint nisi eu veniam ullamco laboris ipsum. Tempor
              excepteur fugiat in exercitation labore cupidatat aliquip culpa
              qui velit Lorem aliquip. Eiusmod incididunt quis ipsum ullamco ad
              culpa fugiat eu ad eiusmod veniam aliquip nisi. Occaecat laborum
              est non ut magna quis quis. Aliqua eiusmod exercitation ea id enim
              cupidatat sit amet proident. Voluptate excepteur cillum Lorem ea
              laborum tempor ex nulla eiusmod culpa exercitation ad. Nulla duis
              elit incididunt veniam dolor eiusmod laborum et officia magna
              aliquip ad. Fugiat esse irure et non irure tempor adipisicing
              officia ad. Excepteur sit esse sit veniam. Qui elit voluptate ut
              mollit occaecat tempor ad nulla.
            </p>
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
              <div className="socials">
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
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ViewArticle;