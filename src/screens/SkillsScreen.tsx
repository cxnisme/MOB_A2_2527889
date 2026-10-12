import React from 'react';
import Card from '../components/Card';
import EduItem from '../components/EduItem';
import Screen from '../components/Screen';
import SectionTitle, { ScreenHeader } from '../components/SectionTitle';
import SkillRow from '../components/SkillRow';
import { EDUCATION, SKILLS } from '../data/portfolio';

export default function SkillsScreen() {
  return (
    <Screen>
      <ScreenHeader tag="SKILLS" aside="+ Education" title="Skills & Education" sub="What I work with, and where I learned it" />
      <SectionTitle count={SKILLS.length}>Core skills</SectionTitle>
      {SKILLS.map((s) => (
        <SkillRow key={s.name} skill={s} />
      ))}
      <SectionTitle count={EDUCATION.length}>Education</SectionTitle>
      <Card>
        {EDUCATION.map((e, i) => (
          <EduItem key={e.title} entry={e} last={i === EDUCATION.length - 1} />
        ))}
      </Card>
    </Screen>
  );
}
