import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BaseViewerItemProps } from './ViewerItem';

export default function LogViewerItem({ viewer }: BaseViewerItemProps) {
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          flexShrink: 1,
        }}
      />
      <Typography>{viewer.message}</Typography>
    </Stack>
  );
}
