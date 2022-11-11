import { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from '../../../components';
import { Description } from '../../../components/Description/Description';
import { Divider } from '../../../components/Divider/Divider';
import { ErrorWrapper } from '../../../components/Error/Error';
import { InlineError } from '../../../components/Error/InlineError';
import { Form, Input, Label, Select, TextArea, Toggle } from '../../../components/Form';
import { FormResponseContext } from '../../../components/Form/FormContext';
import { modal } from '../../../components/Modal/Modal';
import { useAPI } from '../../../providers/ApiProvider';
import { ProjectContext } from '../../../providers/ProjectProvider';
import { MachineLearningList } from './MachineLearningList';
import './MachineLearningSettings.styl';

export const MachineLearningSettings = () => {
  const api = useAPI();
  const { project, fetchProject, updateProject } = useContext(ProjectContext);
  const [mlError, setMLError] = useState();
  const [backends, setBackends] = useState([]);
  const [versions, setVersions] = useState([]);

  const resetMLVersion = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await updateProject({
      model_version: null,
    });
  }, [api, project]);

  const fetchBackends = useCallback(async () => {
    const models = await api.callApi('mlBackends', {
      params: {
        project: project.id,
      },
    });


    if (models) setBackends(models);
  }, [api, project, setBackends]);

  const fetchMLVersions = useCallback(async () => {
    const modelVersions = await api.callApi("modelVersions", {
      params: {
        pk: project.id,
      },
    });

    var versions = [];

    for (const [key, value] of Object.entries(modelVersions)) {
      versions.push({
        value: key,
        label: key + " (" + value + " predictions)",
      });
    }

    setVersions(versions);
  }, [api, project.id]);

  const showMLFormModal = useCallback((backend) => {
    const action = backend ? "updateMLBackend" : "addMLBackend";

    console.log({ backend });
    const modalProps = {
      title: `${backend ? 'Edit' : 'Add'} model`,
      style: { width: 760 },
      closeOnClickOutside: false,
      body: (
        <Form
          action={action}
          formData={{ ...(backend ?? {}) }}
          params={{ pk: backend?.id }}
          onSubmit={async (response) => {
            if (!response.error_message) {
              await fetchBackends();
              modalRef.close();
            }
          }}
        >
          <Input type="hidden" name="project" value={project.id} />

          <Form.Row columnCount={2}>
            <Input name="title" label="Title" placeholder="ML Model" />
            <Input name="url" label="URL" required />
          </Form.Row>

          <Form.Row columnCount={1}>
            <TextArea name="description" label="Description" style={{ minHeight: 120 }} />
          </Form.Row>

          <Form.Row columnCount={1}>
            <Toggle
              name="is_interactive"
              label="Use for interactive preannotations"
            />
          </Form.Row>

          <Form.Actions>
            <Button type="submit" look="primary" onClick={() => setMLError(null)}>
              验证并保存
            </Button>
          </Form.Actions>

          <Form.ResponseParser>{response => (
            <>
              {response.error_message && (
                <ErrorWrapper error={{
                  response: {
                    detail: `Failed to ${backend ? 'save' : 'add new'} ML backend.`,
                    exc_info: response.error_message,
                  },
                }} />
              )}
            </>
          )}</Form.ResponseParser>

          <InlineError />
        </Form>
      ),
    };

    const modalRef = modal(modalProps);
  }, [project, fetchBackends, mlError]);

  useEffect(() => {
    if (project.id) {
      fetchBackends();
      fetchMLVersions();
    }
  }, [project]);

  return (
    <>
      <Description style={{ marginTop: 0, maxWidth: 680 }}>
        添加一个或多个机器学习模型来预测数据的标签。
        要在不连接模型的情况下导入预测，
        {" "}
        <a href="https://labelstud.io/guide/predictions.html" target="_blank">
          看文档
        </a>.
      </Description>
      <Button onClick={() => showMLFormModal()}>
        添加模型
      </Button>

      <Divider height={32} />

      <Form action="updateProject"
        formData={{ ...project }}
        params={{ pk: project.id }}
        onSubmit={() => fetchProject()}
        autosubmit
      >
        <Form.Row columnCount={1}>
          <Label text="ML-Assisted标签" large />

          <div style={{ paddingLeft: 16 }}>
            <Toggle
              label="在提交或更新任何注释后开始模型训练"
              name="start_training_on_annotation_update"
            />
          </div>

          <div style={{ paddingLeft: 16 }}>
            <Toggle
              label="自动加载任务时检索预测结果"
              name="evaluate_predictions_automatically"
            />
          </div>

          <div style={{ paddingLeft: 16 }}>
            <Toggle
              label="在标签流和快速视图中向标注者显示预测"
              name="show_collab_predictions"
            />
          </div>
        </Form.Row>

        {versions.length > 1 && (
          <Form.Row columnCount={1}>
            <Label
              text="模型版本"
              description="模型版本允许您指定将向注释器显示哪个预测。"
              style={{ marginTop: 16 }}
              large
            />

            <div style={{ display: 'flex', alignItems: 'center', width: 400, paddingLeft: 16 }}>
              <div style={{ flex: 1, paddingRight: 16 }}>
                <Select
                  name="model_version"
                  defaultValue={null}
                  options={[
                    ...versions,
                  ]}
                  placeholder="未选择模型版本"
                />
              </div>

              <Button onClick={resetMLVersion}>
                重置
              </Button>
            </div>

          </Form.Row>
        )}
      </Form>

      <MachineLearningList
        onEdit={(backend) => showMLFormModal(backend)}
        fetchBackends={fetchBackends}
        backends={backends}
      />
    </>
  );
};

MachineLearningSettings.title = "机器学习";
MachineLearningSettings.path = "/ml";
