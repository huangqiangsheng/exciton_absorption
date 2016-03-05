clc;clear;
filename = ['sample1_No.10_sweep_v_sweep_lambda_14_dB.csv'];
M = csvread(filename);
target_wl = [1548.7,1550.7,1553.2,1554.6,1557.9,1559.4,1561.2,1562.3,1563.1,1564.7,1566.7,1569.1];
wl = M(1,:);
voltage = M(3:3:end,1);
zero_ind = find((voltage <0.1 )& (voltage >-0.1));
power = M(4:3:end,:);
current = M(5:3:end,:);
ind = zeros(1,length(target_wl));
target_power = zeros(length(voltage),length(target_wl));
minpower_voltage = zeros(size(target_wl));
minpower = zeros(size(target_wl));
for iter = 1:length(target_wl)
    ind(iter) = find(wl == target_wl(iter));
    if isempty(ind)
         fprintf('Not find wl= %.f\n', target_wl(iter));
        break;
    end
    target_power(:,iter) = power(:,ind(iter));
    target_power(:,iter) = target_power(:,iter) - max(target_power(:,iter));
    [Y,I] = min(target_power(:,iter));
    minpower_voltage(iter) = voltage(I);
    minpower(iter) = Y;
end
plot(voltage,target_power);
%  Mout = [[0,target_wl];voltage,target_power];
% xlswrite('sample1_No.10_sweep_v_target_lambda_14_dB.xls',Mout);
figure;
plot(target_wl,minpower_voltage);
Mout = [target_wl;minpower_voltage];
xlswrite('sample1_No.10_sweep_v_minpower_14_dB.xls',Mout);
