import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import React from 'react';
import { Spinner } from '../../../components';
import { useAPI } from '../../../providers/ApiProvider';
import { cn } from '../../../utils/bem';
import './Config.styl';
import { IconInfo } from '../../../assets/icons';

const groupsMap = {
  'Computer Vision': '计算机视觉',
  'Natural Language Processing': '自然语言处理',
  'Audio/Speech Processing': '音频 / 台词处理',
  'Conversational AI': 'AI会话',
  'Ranking & Scoring': '得分与排序',
  'Structured Data Parsing': '结构化数据分析',
  'Time Series Analysis': '事件序列分析',
  'Videos': '视频',
}
const listClass = cn("templates-list");

const Arrow = () => (
  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.9" d="M2 10L6 6L2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

const TemplatesInGroup = ({ templates, group, onSelectRecipe }) => {
  const picked = templates
    .filter(recipe => recipe.group === group)
    // templates without `order` go to the end of the list
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
  return (
    <ul>
      {picked.map(recipe => (
        <li
          key={recipe.title}
          onClick={() => onSelectRecipe(recipe)}
          className={listClass.elem("template")}
        >
          <img src={recipe.image} />
          <h3>{recipe.title}</h3>
        </li>
      ))}
    </ul>
  );
};

export const TemplatesList = ({ selectedGroup, selectedRecipe, onCustomTemplate, onSelectGroup, onSelectRecipe }) => {
  const [groups, setGroups] = React.useState([]);
  const [templates, setTemplates] = React.useState();
  const api = useAPI();

  React.useEffect(async () => {
    const res = await api.callApi('configTemplates');
    if (!res) return;
    const { templates, groups } = res;
    setTemplates(templates);
    setGroups(groups);
  }, []);

  const selected = selectedGroup || groups[0];

  return (
    <div className={listClass}>
      <aside className={listClass.elem("sidebar")}>
        <ul>
          {groups.map(group => (
            <li
              key={group}
              onClick={() => onSelectGroup(group)}
              className={listClass.elem("group").mod({
                active: selected === group,
                selected: selectedRecipe?.group === group,
              })}
            >
              {groupsMap[group]}
              <Arrow />
            </li>
          ))}
        </ul>
        <button type="button" onClick={onCustomTemplate} className={listClass.elem("custom-template")}>自定义模板</button>
      </aside>
      <main>
        {!templates && <Spinner style={{ width: "100%", height: 200 }} />}
        <TemplatesInGroup templates={templates || []} group={selected} onSelectRecipe={onSelectRecipe} />
      </main>
      <footer>
        <IconInfo className={listClass.elem("info-icon")} width="20" height="20" />
        请参阅相关文档 <a href="https://labelstud.io/guide" target="_blank">提供一个模板</a>.
      </footer>
    </div>
  );
};
