import React, { useCallback, useContext } from 'react';
import { Button } from '../../components';
import { Form, Input, TextArea } from '../../components/Form';
import { RadioGroup } from '../../components/Form/Elements/RadioGroup/RadioGroup';
import { ProjectContext } from '../../providers/ProjectProvider';
import { Block } from '../../utils/bem';

export const GeneralSettings = () => {
  const { project, fetchProject } = useContext(ProjectContext);

  const updateProject = useCallback(() => {
    if (project.id) fetchProject(project.id, true);
  }, [project]);

  const colors = [
    '#FFFFFF',
    '#F52B4F',
    '#FA8C16',
    '#F6C549',
    '#9ACA4F',
    '#51AAFD',
    '#7F64FF',
    '#D55C9D',
  ];

  const samplings = [
    { value: "Sequential", label: "连续", description: "任务按照数据管理器的顺序进行排序" },
    { value: "Uniform", label: "随机", description: "任务的选择具有均匀的随机性" },
  ];

  return (
    <div style={{ width: 480 }}>
      <Form
        action="updateProject"
        formData={{ ...project }}
        params={{ pk: project.id }}
        onSubmit={updateProject}
      >
        <Form.Row columnCount={1} rowGap="32px">
          <Input
            name="title"
            label="项目名称"
            labelProps={{ large: true }}
          />

          <TextArea
            name="description"
            label="描述"
            labelProps={{ large: true }}
            style={{ minHeight: 128 }}
          />

          <RadioGroup name="color" label="颜色" size="large" labelProps={{ size: "large" }}>
            {colors.map(color => (
              <RadioGroup.Button key={color} value={color}>
                <Block name="color" style={{ '--background': color }} />
              </RadioGroup.Button>
            ))}
          </RadioGroup>

          <RadioGroup label="任务抽样" labelProps={{ size: "large" }} name="sampling" simple>
            {samplings.map(({ value, label, description }) => (
              <RadioGroup.Button
                key={value}
                value={`${value} 抽样`}
                label={`${label} 抽样`}
                description={description}
              />
            ))}
          </RadioGroup>
        </Form.Row>

        <Form.Actions>
          <Form.Indicator>
            <span case="success">Saved!</span>
          </Form.Indicator>
          <Button type="submit" look="primary" style={{ width: 120 }}>保存</Button>
        </Form.Actions>
      </Form>
    </div>
  );
};

GeneralSettings.menuItem = "常规";
GeneralSettings.path = "/";
GeneralSettings.exact = true;
