import React, { ReactElement } from 'react';
import Typography from '@mui/material/Typography';
import { Chip, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Viewer } from '../../store/Viewer';
import ContextView from '../ContextView';

export interface BaseViewerItemProps {
  viewer: Viewer;
}

interface ViewerItemProps extends BaseViewerItemProps {
  render: (props: { viewer: Viewer }) => ReactElement;
}

export default function ViewerItem({
  viewer,
  render: Component,
}: ViewerItemProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        sx={{
          minHeight: 100,
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          <Typography fontSize={15}>
            {dayjs(viewer.timestamp).format('DD.MM.YYYY h:mm:ss')}
          </Typography>
        </Box>
        <Stack
          sx={{
            maxWidth: '800px',
          }}
          spacing={1}
        >
          {viewer.hasBadge && (
            <Box>
              <Chip
                size="small"
                label={viewer.badge}
                color={viewer.badgeColor}
                variant="outlined"
              />
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              overflow: 'auto',
              fontSize: 16,
            }}
          >
            <Component viewer={viewer} />
          </Box>
          {viewer.context && <ContextView context={viewer.context} />}
        </Stack>
      </Stack>
    </motion.div>
  );
}
