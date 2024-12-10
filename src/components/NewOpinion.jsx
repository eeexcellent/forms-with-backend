import { use, useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinionAction(prevFormState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    let errors = [];

    if (userName.trim().length < 4 || userName.trim().length > 24) {
      errors.push("Username must be between 4 and 24 characters long.");
    }

    if (title.trim().length < 5 || title.length > 40) {
      errors.push("Title must be between 5 and 40 characters long.");
    }

    if (body.trim().length < 10 || body.trim().length > 600) {
      errors.push("Opinion body must be between 10 and 600 characters long.");
    }

    if (errors.length > 0) {
      return {
        errors,
        inputs: {
          userName,
          title,
          body,
        },
      };
    }

    await addOpinion({ title, body, userName });
    return { errors: null };
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.inputs?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.inputs?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.inputs?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
