import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createArticle } from "@src/state/stores/opportunity/operations";

import ImageUploader from "@src/views/common/ImageUploader";
import Editor from "./editor";
import { Article } from "@src/state/stores/opportunity/models";

export interface ArticleFormModalHandler {
  open: () => void;
  close: () => void;
}

const PostArticle: React.FunctionComponent = () => {
  const form = useForm();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articleImage, setArticleImage] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");

  const handleContentChange = (content: string) => {
    console.log(content);
    setContent(content);
  };

  const onSubmit: any = (data: Article) => {
    data.content = content;
    let formData = new FormData();
    if (articleImage) {
      formData.append("blogImage", articleImage[0]);
    }
    formData.append(
      "blog",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    console.log(data);
    setIsLoading(true);
    createArticle(formData, setIsLoading).then(() => {
      toast.success("Article created!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      form.reset();
    });
  };

  return (
    <React.Fragment>
      <section
        className={"section"}
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "100vh",
          overflowX: "auto",
        }}
      >
        <p className="title is-4 has-text-weight-bold has-text-primary has-text-centered">
          Share your Experience!
        </p>

        <div className={"columns is-centered"}>
          <div className={"column is-8"}>
            <form>
              <div className={"field"}>
                <label className="label has-text-primary has-text-weight-medium is-normal">
                  Title
                </label>
                <div className="control">
                  <input
                    className="input border-linear is-normal"
                    type="text"
                    placeholder="p.ex. An Amazing Experience"
                    {...register("title")}
                  />
                </div>
              </div>
              <div className={"field"}>
                <label className="label has-text-primary has-text-weight-medium is-normal">
                  Description
                </label>
                <Editor
                  content={content}
                  handleContentChange={handleContentChange}
                />
              </div>
              <div className="field">
                <p className="help is-primary mb-2">
                  Please do not include pictures that show the name of your
                  Business or Property, as they will be removed.
                </p>
                <ImageUploader
                  images={articleImage}
                  setImages={setArticleImage}
                />
              </div>
              <div className="field mt-3">
                <button
                  className={
                    "button is-primary is-fullwidth " +
                    (isLoading ? "is-loading" : "")
                  }
                  type={"submit"}
                  onClick={handleSubmit(onSubmit)}
                >
                  Share now!
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default PostArticle;
