import useSWR from 'swr';

/**
 * 픽션 초이스 컬렉션에 선정된 리스트를 조회합니다.
 *
 * * End point: /collcections/active?size=${FETCHING_SIZE}
 * @returns collection: API response body
 * @returns projects: List of project URI
 */
function usePictionChoices() {
  const FETCHING_SIZE = 4;

  const { data: collection } = useSWR(`/collections/active?size=${FETCHING_SIZE}`, { revalidateOnFocus: false });
  const projects = collection && [collection.uri].concat(collection.projects.map(p => p.uri));

  return {
    collection,
    projects,
  };
}

export default usePictionChoices;
