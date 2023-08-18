import LexicalEditor from "../page-lexical-editor"
import Jodit from "../page-jodit";
// import FacebookEditor from "../page-facebook-editor";

const Home = () => {
    return <div className="m-5">
        {/* <FacebookEditor /> */}
        <LexicalEditor />
        <Jodit />
    </div>
}

export default Home;