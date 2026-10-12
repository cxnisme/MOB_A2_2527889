import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProjectCard from '../components/ProjectCard';
import Screen from '../components/Screen';
import SectionTitle, { ScreenHeader } from '../components/SectionTitle';
import { PROJECTS } from '../data/portfolio';
import { ProjectsStackParamList } from '../types';

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectList'>;

export default function ProjectsScreen({ navigation }: Props) {
  return (
    <Screen>
      <ScreenHeader tag="PROJECTS" aside="Tap for details" title="Projects" sub="Problem, my contribution, technology" />
      <SectionTitle count={PROJECTS.length}>Portfolio</SectionTitle>
      {PROJECTS.map((p) => (
        <ProjectCard key={p.id} project={p} onPress={() => navigation.navigate('ProjectDetail', { id: p.id })} />
      ))}
    </Screen>
  );
}
