"use client";

import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import Link from "next/link";
import TagList from "../TagList";
import { TablePaginationConfig } from "antd";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import { useRef, useState } from "react";
import { init } from "next/dist/compiled/webpack/webpack";

interface Props {
  //用于展示服务端返回的数据
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  defaultSearchParams?:API.QuestionQueryRequest;
}

/**
 * 题目表格组件
 * @constructor
 */
export default function QuestionTable(props: Props) {
  const actionRef = useRef<ActionType>();

  const { defaultQuestionList, defaultTotal,defaultSearchParams={} } = props;
  //题目列表
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(defaultQuestionList || []);
  //题目总数
  const [total, setTotal] = useState<number>(defaultTotal || 0);

  //是否首次加载
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "题目",
      dataIndex: "title",
      render(_, record) {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags"
      },
      render: (_, record) => <TagList tagList={record.tagList} />,
    },
  ];

  return (
    <div className="question-table">
      <ProTable
        actionRef={actionRef}
        columns={columns}
        size="large"
        search={{
          labelWidth: "auto",
        }}
        form={{
          initialValues: defaultSearchParams
        }}
        //外部赋值数据源
        dataSource={questionList}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `总共 ${total} 条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          // 首次加载
          
          if(isFirstLoad){
            setIsFirstLoad(false);
            if(defaultQuestionList&&defaultTotal){
              return;
            }
          }
          // 默认排序
          const sortField = Object.keys(sort)?.[0]||'createTime';
          const sortOrder = sort?.[sortField]||'descend';
          // 请求
          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.UserQueryRequest);
          // 更新结果
          const newTotal = Number(data.total) || 0;
          const newData = data.records || [];
          setQuestionList(newData);
          setTotal(newTotal);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        />
    </div>
  );
}
