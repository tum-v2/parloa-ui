/* eslint-disable require-jsdoc */
// eslint-disable-next-line require-jsdoc
'use client';
import NavBar from '@/components/nav-bar';
import useSimulation from '@/hooks/useSimulation';

export default function Page() {
  const { data } = useSimulation('6560a2e81c5d1efbf6df6630');
  return (
    <div>
      <NavBar />
      <div className="p-8">{data?.name}</div>
    </div>
  );
}
