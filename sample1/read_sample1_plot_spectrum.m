clc;clear;
filename = ['sample1_No.10_sweep_v_sweep_lambda_14_dB.csv'];
M = csvread(filename);
wl = M(1,:);
voltage = M(3:3:end,1);
power = M(4:3:end,:);
current = M(5:3:end,:);
plot(wl,power(18,:))

% c = polyfit(a, b, 2);  %������ϣ�cΪ2����Ϻ��ϵ��
% d = polyval(c, a, 1);  %��Ϻ�ÿһ���������Ӧ��ֵ��Ϊd
% normal_power = power-repmat(power(end,:),length(voltage),1);
% figure(1);
% plot(wl,normal_power(1:7,:));  shading interp
% xlabel('\lambda (nm)');
% ylabel('Transmission (dB)')
% legend(num2str(voltage(1:7)));
% figure(2);
% plot(wl,normal_power(1:2:end,:));
% figure(3);
% pcolor(wl,voltage(1:10:end),normal_power(1:10:end,:));
% shading interp
