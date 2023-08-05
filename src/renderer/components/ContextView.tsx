import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import JsonView from './JsonView';

interface ContextViewProps {
  context: string;
}

export function renderAttribute(value: unknown) {
  const isNonEmptyArray = _.isArray(value) && _.size(value);
  const isNonEmptyObject = _.isObject(value) && !_.isEmpty(value);
  const isStringOrNumber = _.isString(value) || _.isNumber(value);

  if (isNonEmptyArray && _.size(value) === 1 && _.isString(value[0])) {
    return (
      <Typography
        paddingY={0.2}
        paddingX={0.8}
        fontSize={14}
        borderRadius={1}
        bgcolor="gray"
      >
        {value[0]}
      </Typography>
    );
  }

  if (isNonEmptyArray || isNonEmptyObject) {
    return <JsonView data={value} />;
  }

  if (isStringOrNumber) {
    return value;
  }

  return '-';
}

export default function ContextView({ context }: ContextViewProps) {
  const [attributes, setAttributes] = useState<{ [key: string]: unknown }>({});

  useEffect(() => {
    setAttributes(JSON.parse(context));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <TableContainer
        sx={{
          width: 'auto',
        }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableBody>
            {Object.keys(attributes).map((key) => {
              return (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{key}</TableCell>
                  <TableCell>{renderAttribute(attributes[key])}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
