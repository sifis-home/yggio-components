import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {Calculation, CalcType, Interval} from '../../types';
import {calculationsRequests} from '.';
import {selectCalculationData} from './selectors';

const useCalculationsQuery = () => (
  useQuery(
    ['calculations'],
    async () => calculationsRequests.fetch(),
    {select: selectCalculationData},
  )
);

interface CreateCalculationQuery {
  data: Omit<Calculation, '_id'>;
}

const useCreateCalculation = (queryClient: QueryClient) => useMutation(
  async ({
    data
  }: CreateCalculationQuery) => calculationsRequests.create(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['calculations']);
    }
  }
);

interface PerformCalculationQuery {
  calculationId: string;
  calcType: CalcType;
  interval: Interval
}

const usePerformCalculations = (queryClient: QueryClient) => useMutation(
  async (props: PerformCalculationQuery) => calculationsRequests.perform(
    props.calculationId,
    props.calcType,
    props.interval,
  ),
  {
    onSuccess: async data => {
      await queryClient.invalidateQueries(['device']);
      return data;
    },
  }
);

const useRemoveCalculation = (queryClient: QueryClient) => useMutation(
  async (calculationId: string) => calculationsRequests.remove(calculationId),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['calculations']);
    },
  }
);

export {
  useCalculationsQuery,
  useCreateCalculation,
  usePerformCalculations,
  useRemoveCalculation,
};
