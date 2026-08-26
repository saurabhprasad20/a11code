import Playground from '../../components/Playground';

export const metadata = {
  title: 'Code Playground - A11Code',
  description:
    'An accessible, in-browser code playground where you can write, compile, and run programs in Python, Java, C, C++, and more, with full screen reader and keyboard support.',
};

export default function PlaygroundPage() {
  return (
    <>
      <section className="page-hero" aria-label="Code Playground introduction">
        <div className="container">
          <h1>Code Playground</h1>
          <p>
            Write, run, and hear your code right here in the browser. Choose a
            language, type your program in the accessible editor, and activate Run
            to compile and run it in one step. The output, any errors, and the exit
            code appear below &mdash; announced for screen readers and reachable by
            keyboard. No installation, and nothing to see required.
          </p>
        </div>
      </section>

      <section className="page-content" aria-label="Code editor and output">
        <div className="container">
          <Playground />
        </div>
      </section>
    </>
  );
}
