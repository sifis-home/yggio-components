import _ from 'lodash';
import React from 'react';
import {NextRouter} from 'next/router';
import {useQueryClient} from '@tanstack/react-query';
import {ImageListType, ImageType} from 'react-images-uploading';

import Button from '../../../../components/button';
import TextField from '../../../../components/text-field';
import {
  EditOrganizationWrapper,
  ButtonsContainer,
} from './styled';
import {useLocalState} from '../../../../hooks';
import ImageUploader from '../../../../components/image-uploader';
import formState from './state';
import {organizationsApi, userApi, themesApi} from '../../../../api';

interface EditOrganizationProps {
  orgId: string;
  router: NextRouter;
}

const EditOrganizationPane = (props: EditOrganizationProps) => {
  const queryClient = useQueryClient();
  const userQuery = userApi.useTokenUser();
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const form = useLocalState(formState);
  const createThemeLogoMutation = themesApi.useCreateThemeMutation(queryClient);
  const updateThemeLogoMutation = themesApi.useUpdateThemeMutation(queryClient);
  const deleteThemeLogoMutation = themesApi.useThemeDeletionMutation(queryClient);
  const getThemeLogoQuery = themesApi.useThemesQuery({
    orgId: props.orgId,
  });
  const saveOrgMutation = organizationsApi.useUpdateOrganization(queryClient);

  const [images, setImages] = React.useState<ImageType[]>([]);

  React.useEffect(() => {
    if (organizationQuery.data?.name && organizationQuery.data?.description) {
      form.setInputValue('name', organizationQuery.data?.name);
      form.setInputValue('description', organizationQuery.data?.description);
    }

    const setImage = () => {
      const themeData = getThemeLogoQuery.data;
      const theme = _.find(themeData, data => data.orgId === props.orgId);
      if (theme) {
        const themeLogo = theme.logo;
        if (themeLogo) {
          const setFile = () => {
            setImages([themeLogo]);
          };
          void setFile();
        }
      } else {
        setImages([]);
      }
    };
    void setImage();
  }, [organizationQuery.data, getThemeLogoQuery.data]);

  const saveEdits = async () => {
    await saveOrgMutation.mutateAsync({
      orgId: props.orgId,
      updates: {
        name: form.formInputs.name.value as string,
        description: form.formInputs.description.value as string,
      },
    });
    if (organizationQuery.data?.ownerId === userQuery.data?._id) {
      const [image] = images;

      if (image) {
        try {
          const themeData = getThemeLogoQuery.data;
          const themeExists = _.find(themeData, data => data.orgId === props.orgId);
          if (themeExists) {
            await updateThemeLogoMutation.mutateAsync({
              data: {
                orgId: props.orgId,
                logo: {
                  data: image.data as string,
                  // @ts-ignore - third party library typing is incorrect
                  file: {
                    name: image.file!.name,
                    type: image.file!.type,
                  },
                },
              },
            });
          } else {
            await createThemeLogoMutation.mutateAsync({
              data: {
                orgId: props.orgId,
                logo: {
                  data: image.data as string,
                  // @ts-ignore - third party library typing is incorrect
                  file: {
                    name: image.file!.name,
                    type: image.file!.type,
                  },
                },
              },
            });
          }
          await props.router.push(`/organizations/${props.orgId}/summary`);
        } catch (err) {
          // do nothing?
        }
      } else {
        await deleteThemeLogoMutation.mutateAsync({data: {orgId: props.orgId}});
        await props.router.push(`/organizations/${props.orgId}/summary`);
      }
    }
  };

  const uploadImage = (images: ImageListType) => {
    setImages(images);
  };

  return (
    <EditOrganizationWrapper>
      <h1>Edit organization details</h1>
      <TextField
        label="Name"
        name="name"
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          form.setInputValue('name', evt.target.value);
        }}
        value={form.formInputs.name.value as string}
        margin="0 0 10px 0"
      />
      <TextField
        label="Description"
        name="description"
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          form.setInputValue('description', evt.target.value);
        }}
        value={form.formInputs.description.value as string}
        isOptional
        margin="0 0 10px 0"
      />
      {organizationQuery.data?.ownerId === userQuery.data?._id && (
        <ImageUploader
          description='To upload a new logo, use the image uploader below'
          onClick={uploadImage}
          images={images}
        />
      )}
      <ButtonsContainer>
        <Button
          onClick={saveEdits}
          color="green"
          content={'Save'}
          margin="0 10px 0 0"
        />
        <Button
          content={'Cancel'}
          onClick={async () => props.router.push(`/organizations/${props.orgId}/summary`)}
        />
      </ButtonsContainer>
    </EditOrganizationWrapper>
  );
};

export default EditOrganizationPane;
