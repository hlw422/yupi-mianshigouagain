import { Card } from "antd";
import Title from "antd/es/typography/Title";
import TagList from "../TagList";
import MdViewer from "../MdViewer";

interface Props {
  question: API.QuestionVO;
}
export default function QuestionCardReact({ question }) {
  //level={1} 1级标题可以被搜索引擎收录
  return (
    <div className="question-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>{question.title}</Title>
        <TagList tagList={question.tagList} />
        <div style={{ marginBottom: 16 }} />
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card title="推荐答案">
        <MdViewer value={question.answer} />
      </Card>
    </div>
  );
}
