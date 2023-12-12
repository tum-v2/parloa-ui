import { Card, Skeleton } from 'antd';

const skeletonData = [1, 2, 3];

const SkeletonMetricsCard = () => {
  return skeletonData.map(item => (
    <Card key={item} style={{ width: '100%', height: '100% ' }}>
      <Skeleton active />
    </Card>
  ));
};

export default SkeletonMetricsCard;
