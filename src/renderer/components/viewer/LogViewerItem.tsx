import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BaseViewerItemProps } from './ViewerItem';

export default function LogViewerItem({ viewer }: BaseViewerItemProps) {
  return (
    <Stack>
      <Typography>{viewer.message}</Typography>
    </Stack>
  );
}
