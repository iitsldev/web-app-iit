import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Axios from 'axios';
import { mainAxios } from '../../axios/axiosBackend';
import { Modal } from 'react-bootstrap';
import styles from './ContactUs.module.css';
import AlertBox from '../alertbox/AlertBox';
import CustomToast from '../toast/Toast';
import CustomSpinner from '../spinner/Spinner';
import useTranslation from 'next-translate/useTranslation';

const schema = yup.object().shape(
  {
    contactName: yup.string().required('name_is_mandatory'),
    contactSubject: yup.string().required('subject_is_mandatory'),
    contactMessage: yup.string().required('message_is_mandatory'),
    contactEmail: yup.string().when('contactPhone', {
      is: (fieldPhone) => !fieldPhone || fieldPhone.length === 0,
      then: yup
        .string()
        .required('at_least_one_field_is_required')
        .email('email_must_be_valid'),
    }),
    contactPhone: yup.string().when('contactEmail', {
      is: (fieldEmail) => !fieldEmail || fieldEmail.length === 0,
      then: yup
        .string()
        .required('at_least_one_field_is_required'),
    }),
  },
  ['contactEmail', 'contactPhone']
);

function ContactUs() {
  const { t } = useTranslation('contact-us');
  const recaptchaRef = React.useRef({});
  let submitButton = React.useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    resetField,
    clearErrors,
  } = useForm({ resolver: yupResolver(schema) });

  const [show, setShow] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const handleClose = () => setShow(false);
  const handleSpinnerClose = () => setShowSpinner(false);
  const [varient, setVarient] = useState('primary');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDesc, setAlertDesc] = useState('');

  const onSubmit = async (data) => {
    setShowSpinner(true);
    disableDomElement(submitButton);

    const token = recaptchaRef.current.getValue();
    recaptchaRef.current.reset();

    if (token == '') {
      return;
    }

    const chunk = { ...data, token };

    console.log('************** HOST NAME *****************');
    console.log(process.env.NEXT_PUBLIC_HOST);

    mainAxios
      .post('/mail', chunk, {})
      .then((response) => {
        resetContactUsPageFields();
        enableDomElement(submitButton);
        setShowSpinner(false);
        setAlertBox(
          'success',
          'Success',
          t('success_message')
        );
        setShow(true);
      })
      .catch((e) => {
        setShowSpinner(false);
        console.log('error', e.response.data);
        setAlertBox('danger', 'Failure', e.response.data.errors.join(', '));
        setShow(true);
        enableDomElement(submitButton);
      });
  };

  const setAlertBox = (variant, title, desc) => {
    setVarient(variant);
    setAlertTitle(title);
    setAlertDesc(desc);
  };

  const disableDomElement = (domElement) => {
    domElement.current &&
      domElement.current.setAttribute('disabled', 'disabled');
  };

  const enableDomElement = (domElement) => {
    domElement.current && domElement.current.removeAttribute('disabled');
  };

  const resetContactUsPageFields = () => {
    resetField('contactName');
    resetField('contactPhone');
    resetField('contactEmail');
    resetField('contactSubject');
    resetField('contactMessage');
  };

  const validateCommMethods = () => {
    trigger(['contactEmail', 'contactPhone']);
  };

  return (
    <div className={styles.contactDataWrapper}>
      <AlertBox
        show={show}
        handleClose={handleClose}
        setShow={setShow}
        varient={varient}
        alertTitle={alertTitle}
        alertDesc={alertDesc}
      />
      <Modal
        className="centerSpinnerModal"
        show={showSpinner}
        onHide={handleSpinnerClose}
      >
        <CustomSpinner
          showSpinner={showSpinner}
          handleSpinnerClose={handleSpinnerClose}
        />
      </Modal>

      <div
        className={`${styles.contactLeftContainer} ${styles.paddingLeft30} ${styles.pr99}`}
      >
        <div className={styles.nameContainer}>
          <div className={styles.lineHeight1}>International Institute of</div>
          <div className={styles.lineHeight1}>Theravada</div>
        </div>
        <div
          className={`${styles.addressContainer} ${styles.mb25} ${styles.pl20}`}
        >
          <div className={`${styles.addressImageCont} ${styles.mr24}`}>
            <img
              className={`d-block w-100 ${styles.pinImgMaxWidth}`}
              src="/Address.svg"
              alt="Address.svg"
              width="24px"
            />
          </div>
          <div className={styles.addressNameContainer}>
            <div> Heenetikalma,</div>
            <div>Karuwalagaswewa,</div>
            <div>Sri Lanka.</div>
          </div>
        </div>
        <div
          className={`${styles.commMethodContainer} ${styles.mb25} ${styles.pl20}`}
        >
          <div className={`${styles.contactImageCont} ${styles.mr18}`}>
            <img
              className={`d-block w-100 ${styles.contactImgMaxWidth}`}
              src="/contact.svg"
              alt="Contact.svg"
              width="36px"
            />
          </div>
          <div className={styles.contactDetailsContainer}>
            <div>inst.theravada@gmail.com</div>
            <div>+94 77 453 1614</div>
          </div>
        </div>
        <div
          className={`${styles.directionsContainer} ${styles.mb25} ${styles.pl20}`}
        >
          <div className={`${styles.directionsImageCont} ${styles.mr24}`}>
            <img
              className={`d-block w-100 ${styles.pinImgMaxWidth}`}
              src="/Directions.svg"
              alt="Directions.svg"
              width="24px"
            />
          </div>
          <div className={styles.directionDetailsContainer}>
            <a>{t('get_directions')}</a>
          </div>
        </div>
      </div>
      <div
        className={`${styles.contactRightContainer} ${styles.paddingHorizontal30}`}
      >
        <form
          className={styles.contactUsForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={`${styles.mb26} ${styles.flexContainer}`}>
            <div className={styles.mr32}>
              <label
                htmlFor="contactName"
                className={`form-label ${styles.contactLabelsText}`}
              >
                {t('name')}
              </label>
              <input
                type="text"
                className={`form-control ${styles.width356} ${styles.pd19} ${styles.bgColorBrown} ${styles.contactInputText} ${styles.height68}`}
                id="contactName"
                {...register('contactName')}
              />
              <div className={`${styles.InvalidFeedback}`}>
                {t(errors.contactName?.message)}
              </div>
            </div>
            <div>
              <label
                htmlFor="contactEmail"
                className={`form-label ${styles.contactLabelsText}`}
              >
                {t('email')}
              </label>
              <input
                type="email"
                className={`form-control ${styles.width356} ${styles.pd19} ${styles.bgColorBrown} ${styles.contactInputText} ${styles.height68}`}
                id="contactEmail"
                {...register('contactEmail')}
                onBlur={validateCommMethods}
              />
              <div className={`${styles.InvalidFeedback}`}>
                {t(errors.contactEmail?.message)}
              </div>
            </div>
          </div>
          <div className={`${styles.mb26} ${styles.flexContainer}`}>
            <div className={styles.mr32}>
              <label
                htmlFor="contactPhone"
                className={`form-label ${styles.contactLabelsText}`}
              >
                {t('phone')}
              </label>
              <input
                type="text"
                className={`form-control ${styles.width356} ${styles.pd19} ${styles.bgColorBrown} ${styles.contactInputText} ${styles.height68}`}
                id="contactPhone"
                {...register('contactPhone')}
                onBlur={validateCommMethods}
              />
              <div className={`${styles.InvalidFeedback}`}>
                {t(errors.contactPhone?.message)}
              </div>
            </div>
            <div>
              <label
                htmlFor="contactSubject"
                className={`form-label ${styles.contactLabelsText}`}
              >
                {t('subject')}
              </label>
              <input
                type="text"
                className={`form-control ${styles.width356} ${styles.pd19} ${styles.bgColorBrown} ${styles.contactInputText} ${styles.height68}`}
                id="contactSubject"
                {...register('contactSubject')}
              />
              <div className={`${styles.InvalidFeedback}`}>
                {t(errors.contactSubject?.message)}
              </div>
            </div>
          </div>
          <div className={styles.mb26}>
            <label
              htmlFor="contactMessage"
              className={`form-label ${styles.contactLabelsText}`}
            >
              {t('message')}
            </label>
            <textarea
              className={`form-control ${styles.minHeight213} ${styles.pd19} ${styles.bgColorBrown} ${styles.contactInputText}`}
              id="contactMessage"
              rows="3"
              {...register('contactMessage')}
            ></textarea>
            <div className={`${styles.InvalidFeedback}`}>
              {t(errors.contactMessage?.message)}
            </div>
          </div>
          <div className={styles.mb26}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              size="normal"
            />
          </div>
          <div className={styles.mb26}>
            <button
              type="submit"
              className={styles.submitButton}
              ref={submitButton}
            >
              {t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
