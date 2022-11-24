import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoginForm } from "@src/state/stores/user/models";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@src/state/stores/hooks";
import { doSetRole } from "@src/state/stores/user/operations";

import ImageUploader from "@src/views/common/ImageUploader";
import Editor from "./editor";

export interface ArticleFormModalHandler {
  open: () => void;
  close: () => void;
}

const PostArticle: React.FunctionComponent<> = () => {
  const form = useForm();
  const { handleSubmit, getValues } = form;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pwdEnabled, setPwdEnabled] = useState<boolean>(true);
  const [images, setImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>("");

  const handleContentChange = (content: string) => {
    console.log(content);
    setContent(content);
  };

  const onSubmit: any = (data: LoginForm) => {
    setIsLoading(true);
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
                <ImageUploader images={images} setImages={setImages} />
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
