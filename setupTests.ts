import {configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

// Configure Enzyme with React 16 adapter
configure({adapter: new Adapter()});
