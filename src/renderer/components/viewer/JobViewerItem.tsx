import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BaseViewerItemProps } from './ViewerItem';

export default function JobViewerItem({ viewer }: BaseViewerItemProps) {
  return (
    <Stack spacing={1}>
      <Typography>{viewer.message}</Typography>
    </Stack>
  );
}
