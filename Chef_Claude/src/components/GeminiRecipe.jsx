import Markdown from "react-markdown"

export default function Gemini({ recipe, loading }) {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      { loading ? <p>Generating Recipe...</p> : <article>
        <h2>Chef Gemini Recommends:</h2>
        <Markdown>{recipe}</Markdown>
      </article> }
    </section>
  )
}