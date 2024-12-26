import { Card } from "antd";
import Title from "antd/es/typography/Title";

interface Props{
    question:API.QuestionVO;
}
const QuestionCard:React.FC<Props> = ({question}) => {

    return (
        <div className="question-card">
            <Card>
                <Title level={1}>
                    {question.title}
                </Title>
            </Card>

        </div>
    )
}