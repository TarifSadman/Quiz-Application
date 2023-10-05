import { useQuery } from "react-query";
import axios from "axios";

const DynamicQueses = () => {

    const {data} = useQuery("dynamicQueses",
     () => axios("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"));
     console.log(data, "dynamicData");

    return (
        <div>
            <h1>{data}</h1>
        </div>
    );
};

export default DynamicQueses;
